# AElf Stats

AElf Stats is a project designed to collect git history and bulk export it to Elasticsearch.

- [AElf Stats](#aelf-stats)
  - [About The Project](#about-the-project)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Configuration](#configuration)
    - [Environment variables](#environment-variables)
  - [Grafana Dashboard](#grafana-dashboard)
  - [Contributing](#contributing)
  - [License](#license)

## About The Project

- Collects and exports git history data.
- Dockerized for easy setup and deployment.
- Integrates with Elasticsearch for data storage and analysis.

## Prerequisites

- Docker

## Installation

1. Clone the repository:

```sh
git clone https://github.com/AElfProject/aelf-stats.git
cd aelf-stats
```

2. start the application:

```sh
docker compose up -d
```

## Usage

The application will automatically collect git history and export it to Elasticsearch.

## Configuration

### Environment variables

| Name               | Default Value         | Description                   |
| ------------------ | --------------------- | ----------------------------- |
| REPO               |                       | Repo, e.g. `AElfProject/AElf` |
| ELASTICSEARCH_NODE | http://localhost:9200 | Address of elasticsearch node |

## Grafana Dashboard

An example is included at [dashboard.json](./dashboard.json).

For more details on how to import it, see https://grafana.com/docs/grafana/latest/dashboards/build-dashboards/import-dashboards/.

## Contributing

If you encounter a bug or have a feature request, please use the [Issue Tracker](https://github.com/AElfProject/aelf-dapp-factory/issues/new). The project is also open to contributions, so feel free to fork the project and open pull requests.

## License

Distributed under the Apache License. See [License](LICENSE) for more information.
Distributed under the MIT License. See [License](LICENSE) for more information.
