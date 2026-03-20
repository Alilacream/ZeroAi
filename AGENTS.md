# Agent Guidelines for ZeroAi_verify Laravel Application

This file provides essential instructions for AI agents working in this Laravel 12 + Inertia + React project. Follow these guidelines to maintain consistency and quality.

## 🚀 Agent Operations

### Development Commands

- Start development server: `composer run dev` (runs Laravel Sail with Vite)
- Build for production: `npm run build`
- Run Laravel pipeline: `composer run lint` (includes Pint and PHPStan)
- Start MySQL via Sail: `./vendor/bin/sail up -d`

### Testing Commands

- Run all tests: `php artisan test`
- Run tests with coverage: `php artisan test --coverage`
- Run a single test file: `php artisan test tests/Feature/ExampleTest.php`
- Run a single test method: `php artisan test --filter=test_basic_functionality`
- Run Pest tests specifically: `php artisan test --pest`
- Watch mode for tests: `php artisan test --watch`

### Code Quality

- Fix PHP formatting: `vendor/bin/pint`
- Validate PHPStan: `php artisan phpstan`
- Fix JS/TS formatting: `npm run format`
- Lint JS/TS: `npm run lint`

## 📋 Code Style Guidelines

### PHP (Laravel 12)

- Use PHP 8.2+ features: constructor property promotion, match expressions, nullsafe operator
- Always declare return types and parameter types
- Prefer Eloquent over query builder; use relationships with type hints
- Use Form Requests for validation (never inline validation in controllers)
- Configure casts in `casts()` method, not `$casts` property
- Use PHPDoc blocks for complex logic; avoid inline comments
- Enums: use TitleCase for keys (e.g., `FavoritePerson`)
- Never use `env()` outside config files; use `config()` helper
- Queue time-consuming operations with `ShouldQueue` interface

### JavaScript/TypeScript (React + Inertia)

- Use functional components with hooks; avoid class components
- Import routes from `@/routes/` and actions from `@/actions/` (Wayfinder)
- Use `useForm()` from `@inertiajs/react` for form handling
- Implement loading states with `usePage().props` or custom hooks
- Follow Tailwind CSS v4 utility-first approach
- Use TypeScript strict mode; avoid `any` type
- Export constants from `lib/` directory; components from `components/`

### Styling (Tailwind CSS v4)

- Use existing utility classes; create new ones only when necessary
- Follow established patterns for spacing (using 4px base), colors, and typography
- Implement dark mode using `dark:` variants
- Use `@apply` sparingly; prefer utility classes in markup
- Responsive design: mobile-first approach with `sm:`, `md:`, `lg:` prefixes

### Naming Conventions

- PHP: `camelCase` for methods/variables, `StudlyCase` for classes
- Constants: `UPPER_SNAKE_CASE`
- Events: `SomethingHappened` (past tense)
- Jobs: `ProcessSomething` (verb + noun)
- TS/JS: `camelCase` for variables/functions, `PascalCase` for components
- Tailwind: use semantic class names when extracting components

### Error Handling

- PHP: use try/catch for recoverable errors; let exceptions bubble for validation
- Log errors using Laravel's logger: `Log::error($message, $context)`
- Inertia: handle form errors with `useForm().errors`
- API responses: use proper HTTP status codes; return JSON error objects
- Validation: return 422 with field-specific error messages

## 🧪 Testing Practices (Pest)

- Feature tests: `tests/Feature/`; Unit tests: `tests/Unit/`
- Use Pest's expressive syntax: `it('does something', function () { ... })`
- Authentication: use `actingAs($user)` helper
- Database: use `RefreshDatabase` trait; seed only when necessary
- Mock dependencies: use Mockery or Laravel's built-in fakes
- Test database transactions: `assertDatabaseHas()`, `assertDatabaseMissing()`
- Inertia: assert component props with `assertInertia()`
- Run single test: `php artisan test --filter=test_name`

## 🔧 Essential Tools & Practices

- **Always** use `search-docs` before making framework changes
- Activate relevant skills when working in specific domains:
    - `wayfinder-development` for frontend-backend routing
    - `pest-testing` for all testing activities
    - `inertia-react-development` for React/Inertia components
    - `tailwindcss-development` for styling changes
- Use Artisan generators: `php artisan make:model`, `php artisan make:controller`
- Register middleware in `bootstrap/app.php` (Laravel 12+)
- Never commit secrets; use environment variables in `.env.example`
- Run `vendor/bin/pint --dirty --format agent` before committing PHP changes
- Check browser logs with `browser-logs` tool for frontend debugging

## 📁 Directory Structure Conventions

- Controllers: `app/Http/Controllers/` (use invokable when single method)
- Models: `app/Models/` (use casts() method, not $casts property)
- Routes: `routes/web.php` (API in `routes/api.php`)
- Views/Pages: `resources/js/pages/` (Inertia components)
- Components: `resources/js/components/` (shared React components)
- Actions: `app/Actions/` (for complex business logic)
- Resources: `app/Http/Resources/` (API resources)
- Database: `database/migrations/`, `database/factories/`, `database/seeders/`

## ⚠️ Critical Reminders

1. Never modify `bootstrap/app.php` without understanding service providers
2. Always eager-load relationships to prevent N+1 queries (`with()`)
3. Use Laravel's pagination: `Model::paginate(15)`
4. For API routes, use resource controllers and API resource classes
5. Never skip writing tests; every change requires test coverage
6. When in doubt, check existing patterns in the codebase first
7. Run `composer run dev` to see real-time frontend/backend changes
8. Use Wayfinder for type-safe route generation in TypeScript
