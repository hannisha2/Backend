❌ Violated SOLID Principles
1. Single Responsibility Principle (SRP)
A class should have only one reason to change.
Violation: The Notification class handles multiple responsibilities — logic for different channels, input validation, and message formatting.

2. Open/Closed Principle (OCP)
Entities should be open for extension, but closed for modification.
Violation: To add a new notification type, you must change the send() method, violating this principle.

3. Liskov Substitution Principle (LSP) (Indirect Violation)
Subclasses should be substitutable for their base classes.
Violation: The class doesn't support polymorphism. You can't extend or substitute behavior cleanly due to tightly coupled logic.

4. Dependency Inversion Principle (DIP)
High-level modules should not depend on low-level modules.
Violation: The class depends on concrete implementations and conditions, not abstractions or interfaces.

5. Interface Segregation Principle (ISP)
Clients should not be forced to depend on interfaces they don't use.
Not applicable in this example. No interfaces are defined or misused.
