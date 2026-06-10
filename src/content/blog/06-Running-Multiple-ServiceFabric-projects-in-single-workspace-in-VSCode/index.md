---
title: "Running Multiple Service Fabric projects in a single workspace in VSCode"
description: "A guide to configure and run multiple Service Fabric projects in a single workspace in Visual Studio Code, providing a centralized debugging experience."
date: "2026-05-20"
draft: false
tags:
  - "2026"
  - microservices
  - backend
  - software-architecture
---

### Problem Statement:

#### Why Visual Studio forces multi-instance workflow?

Visual studio allows you to run a single project in an instance, which has its benefits with fast & better debugging, better IntelliSense, less configuration etc., but then forces you to run multiple projects in their own instances of visual studio which attaches to fragmented debugging across workspaces.

> Note: You can only work on a single project at a time like in Visual Studio. Although you can run and debug multiple projects.

### Goal:

Visual Studio Code (VS Code) shines here where you can customize and configure your projects however you want, giving the developer more control of the projects. In this post, we will look at a one-time configuration of how you can run multiple projects in a single workspace in VS Code which gives you many benefits like centralized debugging, single workspace with a lightweight IDE.

> "This is an experimental/workaround and may not replace the standard Visual Studio workflow in all scenarios."
> The setup guide shows you how can debug Service Fabric projects in VS Code and can be applied to other types of projects.

### Set up Guide:

#### Prerequisites:

- .NET SDK (visit their [official documentation](https://dotnet.microsoft.com/en-us/download/dotnet) )
- VS Code with the C# Dev Kit extension installed
- (For Service Fabric projects) Service Fabric Local Cluster running. If not then follow the Official Microsoft documentation.
- (For Service Fabric projects) Service Fabric SDK
- Windows Powershell terminal 5.1
- MSBuild 2022 via Visual Studio
- VS Code must run in Admin Mode to ensure smooth deugging experience.

#### Configuration:

You only need two files `tasks.json` and `launch.json` to run your projects.

> You can have all the configuration files under your workspace config file as well.

For running the project and deploying to Service Fabric Cluster, you should have three steps:

- Build: Compiles the project using MSBuild.
- Package: Packages the project under /pkg directory.
- Deploy: Deploys the package to the local Service Fabric (SF) cluster.

Below is the template you need to setup `tasks.json` and `launch.json`

> Note: The configuration is developed with some help from AI and online resources. Kindly try this first in experiment mode first.

```json
// Build
{
	"label": "Build Project", // label the project
	"type": "process", // change the type to process
	"command": "MsBuild path", // add the path to the MSBuild.exe which builds the project.
	"args": [
		"Project Solution path",
		"/t:Build",
		"/p:Configuration:Debug",
		"/p:Platform:x64"
	],
	"problemMatcher": "$msCompile",
	"presentation": {
		"reveal": "always",
		"panel": "shared"
	}, // to see the output in the integrated terminal
}

// Package
{
	"label": "Package Project", // label the project
	"type": "process", // change the type to process
	"dependsOn": [
		"Build Project"
	], // reference the "Build Project" label
	"command": "MsBuild path", // add the path to the MSBuild.exe which builds the project.
	"args": [
		"Project Solution path",
		"/t:Package",
		"/p:Configuration:Debug",
		"/p:Platform:x64"
	],
	"problemMatcher": "$msCompile",
	"presentation": {
		"reveal": "always",
		"panel": "shared"
	}, // to see the output in the integrated terminal
}
// Deploy
{
	"label": "Deploy Project", // label the project
	"type": "shell", // change the type to shell
	"dependsOn": [
		"Package Project"
	], // reference the "Package Project" label
	"command": "powershell.exe", // add the path to the MSBuild.exe which builds the project.
	"args": [
		"-NoProfile",
		"-ExecutionPolicy",
		"Bypass",
		"-File",
		"add the powershell script to deploy the service fabric, comes with initial setup of creating a Service Fabric project",
		"-ApplicationPackagePath": "Debug File Path",
		"-PublishProfile": "add the path to Local Node config xml file""-OverwriteBehavior": "Always",
	],
	"group": "build",
	"presentation": {
		"reveal": "always",
		"panel": "dedicated"
	}, // to see the output in the integrated terminal
}
```

`"type": "process"` - for MSBuild, more reliable then `"type": "shell"`. No escaping issues.
`"dependsOn:":"sequence"` ensures tasks are run after another and not in parallel.
""powershell.exe" - for SF cmdlets which requires powershell 5.1

The `launch.json` is created for VS Code to launch and run the project.

```json
{
	"name": "Deploy & Attach Project Manager",
	"type": "coreclr",
	"request": "attach",
	"processId": "${command:pickProcess}",
	"preLaunchTask": "Deploy Project", // reference the "Deploy Project" label
	"justMyCode": "false", // flag to enable multiple projects in debug mode
	"suppressJTIOptimizations": true,
	"requireExactSource": false,
},
{
	"name": "Launch Project Client",
	"type": "coreclr",
	"request": "attach",
	"processId": "${command:pickProcess}",
	"preLaunchTask": "Build Project",
	"program": "add the dll path",
	"args": [],
	"cwd": "",
	"console": "externalTerminal",
	"justMyCode": "false",
},
{
	"compounds": [
		{
			"name": "Run All Services + Client",
			"configurations": [
				"Deploy & Attach Project Manager",
				"...// add multiple project debug process"
			],
			"stopAll": true
		},
	],
},
```

You need to manually select the process once the process to attach the debug manager once the project is deployed in local SF cluster.

Now saved the configurations and make sure the VS Code is opened as an Admin.
If running VS Code as admin shows "coreclr not installed". you can install the C# extension via powershell command.

```
powershell & "add path to bin folder of VS Code" -install-extension msdotnettools.csharp
```

And then relaunch the VS Code

Next, make sure the local SF cluster is running. You can check the official documentation for this.
Now in VS Code, go to Run & Debug mode and start the "Run all service + client" option from dropdown.
This will Build, Package and Deploy the project. Once your project is deployed VS Code will show you to select the process.
To select the process, search for your SF manager. You need to select the manager for every project to attach the debugger. This will make sure the breakpoints you added in your projects will work.

You should see the breakpoints are active in your projects and are deployed in the local SF cluster.

Troubleshooting:

1. coreclr not installed -

```
powershell & "add path to bin folder of VS Code" -install-extension msdotnettools.csharp
```

2. Access denied when attaching the Debug Manager -
   Run the VS Code in admin mode.
3. Manager process picker not visible - Cancel the process picker and make sure the local SF cluster has deployed the SF Project or wait for the project to be deployed, then attach the manager.

For some use cases, you may want to manually run the Service Fabric commands. You can find the commands in their [official documentation](https://github.com/microsoft/service-fabric) itself.

This post specifically focuses on running Service Fabric Projects in VS Code, but similar intend can be used to run and debug other types of projects as well.

### References:

1. .NET Download - <https://dotnet.microsoft.com/en-us/download/dotnet>
2. Service Fabric Repository - <https://github.com/microsoft/service-fabric>
