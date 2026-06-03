---
title: "Microservices"
description: "A discussion on the benefits and challenges of using microservices architecture."
date: "2026-05-25"
draft: false
tags:
  - "2026"
  - microservices
  - backend
  - software-architecture
---

## Key principles of Clean Architecture

### Seperation of Concerns (SoC)

- organizing the code into independent layers where each layer is responsible for specific part of your application.

### Single responsibility

- Each class/function/object should only have one job or one reason to change. Easire to implement and prevent side effects for future updated.

### Open/Close principle - stability rule

- Open for extension and close for modification. If business requirements change, you should not alter the existing code but instead add new code that extends the old code. This is achieved usign abstractions like interfaces or abstract classes.

### Dependency Inversion Principle (DIP)

- How each layers interact with each other. Ex. The core bussiness logic should not depend on external layers like specific database or framework.
  Domain layer should not depend on Application layer
  Application layer should not depend on Infrastructure layer
  Dependencies flow inward
  Define abstracvtion like interfaces in the code
  And outer layer implements those interfaces

### Domain - Core bussiness rules are available

bussiness logiv of the system design.
Highly abstracted and stable.
Not have any depenencies.
Outer layer should depend on domain layer.

Layer contains:

- Domain entities
- Aggregates
- Value objects
- Enumerations
- Domain events
- Constants

#### Entity

Entity is a class that is defined by the unique identity like Id, not by its attributes

#### Value objects

Value objects dont have any concept of identity of their own. Its defined by its attributes.
They are immutable. Any change results to a new instance of the value object.

#### Aggregates

A cluster of related entities and value objects and they are all treated as a single unit.

Ex. Clubs, Players, Stadiums are aggregates for LeagueManager Domain Model.
Where Club, Player, Stadium are considered as entities.

#### AggregateRoot

Each aggregate has designated entity called aggregateroot which is the only entry point for external interactions with the aggregate. Ex Club, Player and Stadium are aggregateroot.

### Application

Implements the bussiness logic and use cases of the application.

Depend on domain layer only.
Defines intefaces that are implemented by outer layers.
Contains

- Abstractions
- contracts
- ports
- intefaces
- bussiness services
- CQRS commmands and queries
- application expections
- DTOs,
- request and response models
- Domain entities to DTO mappers
- Validators
- Behavious
- Specifications

### Infrastructure

Handles the external details and implementations of the interfaces defined by the application layer.

Third party services handles logging, authentication, file storage
Contains

- Authenticaiton and Identity services
- File or object storage
- Message queue storage
- Third party services
- email and notification service
- logging services
- payment services
- social logins

### Persistence

Focuses on databases and caching operations.

Takes the interfaces defined in the application layer and implements them using EF core or Dapper.
Dependencies related to databases like SQL / Oracle / Postgres server.
Contains

- Data contracts
- Repositories
- Data migration
- Data seeding code
- In memory caching
- Distributed caching

### Presentation

Responsible for presenting GUI or exposing public web APIs.

Contains

- Web page
- Web components
- Web APIs
- Controllers
- Views
- Middlewares
- Filters
- Atributes
- View models
- Stylesheets
- Javascript files
- Images

### Challenges

- Learning curve
- Complexity
- Over engineering
- Tooling limitations

### CLEAN - Testable, maintainable and scalable architecture
