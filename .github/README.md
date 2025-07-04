# Git Templates

This directory contains git templates and configurations to standardize git usage across the repository.

## Commit Message Template

The `.gitmessage` file provides a standardized format for git commit messages following the Conventional Commits specification with some customizations.

### Format

```text
[type][scope]: title
```

### Components

- **type**: Describes the kind of change
  - `feat`: A new feature
  - `fix`: A bug fix
  - `refactor`: Code change that neither fixes a bug nor adds a feature
  - `perf`: Code change that improves performance
  - `build`: Changes that affect the build system or external dependencies
  - `chore`: Other changes that don't modify src or test files
  - `docs`: Documentation only changes
  - `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
  - `test`: Adding missing tests or correcting existing tests

- **scope**: Specifies the area of the codebase affected
  - `FE`: Frontend changes
  - `BE`: Backend changes
  - `BOTH`: Changes affecting both frontend and backend

- **title**: A concise description of the change (50 characters max)

### Usage

#### Setting up the commit template

```bash
# Set the commit template for this repository
git config --local commit.template development/git/.gitmessage
```

#### Creating a commit with the template

When you run `git commit` without the `-m` flag, your default editor will open with this template. Fill in the appropriate information and save to create your commit.

### Examples

```
[feat][FE]: Add user authentication component
```

```
[fix][BE]: Resolve database connection timeout issue
```

```
[docs][BOTH]: Update API documentation
```

## Benefits

- **Consistency**: Standardized commit messages across the project
- **Clarity**: Clear indication of the type and scope of changes
- **Automation**: Enables automated changelog generation
- **Review Efficiency**: Makes code reviews more efficient
