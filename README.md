# Pokemon API in Node.js

This is a simple Pokemon API built using Node.js. It provides information about various Pokemon, including their names, types, abilities, and more. You can use this API to fetch Pokemon data for your applications or projects.

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

Before you start using the Pokemon API, make sure you have the following software installed:

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

The Pokemon API server should now be running on `http://localhost:3000`.

## Usage

To use the Pokemon API, you can make HTTP requests to the various endpoints provided by the server. The API endpoints are documented below.

## API Endpoints

### Get all Pokemons

Retrieve information about all Pokemons.

- **Endpoint**: `/pokemons/`
- **Method**: GET
- **Parameters**:
  - `id` (integer): The ID of the Pokemon you want to retrieve.

### Get all Pokemons

Retrieve information about a specific Pokemon by its name.

- **Endpoint**: `/pokemons?name=string`
- **Method**: GET
- **Parameters**:
  - `name` (string): The name of the Pokemon you want to retrieve.

### Get Pokemon by ID

Retrieve information about a specific Pokemon by its ID.

- **Endpoint**: `/pokemon/:id`
- **Method**: GET
- **Parameters**:
  - `id` (integer): The ID of the Pokemon you want to retrieve.


## Examples

Here are some example requests you can make to the Pokemon API:

- Get information about Pokemon by ID:

  ```
  GET /pokemons/25
  ```

- Get information about Charizard by name:

  ```
  GET /pokemons/charizard
  ```

- Get Pokemons by type

  ```
  GET /pokemons/types/poison
  ```

## Contributing

Contributions to this project are welcome. If you have any improvements or feature suggestions, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
