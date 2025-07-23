---
slug: solid-principles-lld
title: Understanding SOLID Principles in Low-Level Design
authors: Sirasudeen
tags: [lld, solid, design, java, system-design]
---

> "Good software is understandable, extensible, and maintainable. That's exactly what SOLID aims to achieve."

As I started diving into **Low-Level Design (LLD)** through TUF+ and hands-on practice, one of the first core topics I focused on was the **SOLID principles**, the  five fundamental guidelines that help make object-oriented design cleaner, more maintainable, and more scalable.

Here’s a simple breakdown of what I learned:


### 🔹 1. Single Responsibility Principle (SRP)

> **A class should have one and only one reason to change.**

 **Meaning**: Each class should do only one job, not multiple.

 **Example**:  
Instead of one `Employee` class doing database and email work, I split it into:
- `Employee` – holds data  
- `EmployeeRepository` – handles DB logic  
- `EmailService` – sends mails

This makes each class smaller, testable, and focused.


### 🔹 2. Open/Closed Principle (OCP)

> **Classes should be open for extension but closed for modification.**

 **Meaning**: You should be able to add new features without changing existing code.

 **Example**:  
Instead of a `Shape` class using `if` conditions for area logic, I used a `Shape` interface and let each shape (Circle, Rectangle) implement its own `area()` method.

When I added a `Triangle`, no existing code broke. I just added a new class.


### 🔹 3. Liskov Substitution Principle (LSP)

> **Subclasses should be substitutable for their base classes.**

 **Meaning**: Derived classes must behave as expected when used as base types.

 **Anti-Example**: Making an `Ostrich` extend `Bird` and overriding `fly()` with an exception violates LSP.

 **Fix**: I split `Bird` into `Bird` (for common behavior) and `FlyingBird`, so Ostrich doesn’t pretend to fly.


### 🔹 4. Interface Segregation Principle (ISP)

> **Clients should not be forced to depend on interfaces they don't use.**

 **Meaning**: Split large interfaces into smaller ones.

 **Anti-Example**: A `Worker` interface with both `work()` and `eat()` but robots don’t eat!

 **Fix**: Created separate `Workable` and `Eatable` interfaces. Now robots implement only what they need.


### 🔹 5. Dependency Inversion Principle (DIP)

> **High-level modules should not depend on low-level modules. Both should depend on abstractions.**

 **Meaning**: Code to interfaces, not concrete classes.

 **Bad**: `App` directly depends on `MySQLDatabase`.

 **Good**: Created a `Database` interface and passed `MySQLDatabase` via constructor — now it’s easy to switch to `MongoDB` or mock in tests.

---

###  Final Thoughts

Learning and applying **SOLID** has transformed how I write code. I used to just make things “work” and now I try to make them **clean**, **modular**, and **extendable**.

Next, I’m going to explore:
- Design Patterns (Factory, Strategy, Observer, etc.)
- Real-world LLD case studies like Splitwise & Parking Lot
- Class & Sequence diagrams for better system modeling

You can check out my GitHub repo where I’m storing all my code examples 👉 [lld-patterns GitHub](https://github.com/Sirasudeen/Low-Level-Design)

---

_Thanks for reading! If you’re also learning LLD, feel free to reach out or suggest improvements._

