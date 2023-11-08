# Pokémon API in Node.js

This is a simple Pokémon API built using Node.js. It provides information about various Pokémon, including their names, types, abilities, and more. You can use this API to fetch Pokémon data for your applications or projects.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you start using the Pokémon API, make sure you have the following software installed:

- Node.js: Download and install Node.js from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/pokemon-api-nodejs.git
   ```

2. Navigate to the project directory:

   ```bash
   cd pokemon-api-nodejs
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the server:

   ```bash
   npm start
   ```

The Pokémon API server should now be running on `http://localhost:3000`.

## Usage

To use the Pokémon API, you can make HTTP requests to the various endpoints provided by the server. The API endpoints are documented below.

## API Endpoints

### Get Pokémon by ID

Retrieve information about a specific Pokémon by its ID.

- **Endpoint**: `/pokemon/:id`
- **Method**: GET
- **Parameters**:
  - `id` (integer): The ID of the Pokémon you want to retrieve.

### Get Pokémon by Name

Retrieve information about a specific Pokémon by its name.

- **Endpoint**: `/pokemon/:name`
- **Method**: GET
- **Parameters**:
  - `name` (string): The name of the Pokémon you want to retrieve.

### Get Pokémon Types

Retrieve a list of all Pokémon types.

- **Endpoint**: `/types`
- **Method**: GET

## Examples

Here are some example requests you can make to the Pokémon API:

- Get information about Pikachu by ID:

  ```
  GET /pokemons/25
  ```

- Get information about Charizard by name:

  ```
  GET /pokemons/charizard
  ```

- Get a list of all Pokémon types:

  ```
  GET /types
  ```

- Get a list of all Pokémon abilities:

  ```
  GET /abilities
  ```

## Contributing

Contributions to this project are welcome. If you have any improvements or feature suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
