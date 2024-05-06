# URL Shortener

A simple URL shortener service built using Express.js.

## Table of Contents

- Introduction
- Installation
- Usage

## Introduction

This project provides a basic implementation of a URL shortener service using Express.js. It includes features such as generating short codes for URLs, redirecting to the original URLs, and handling retries for failed redirects.

## Installation

1. **Clone this repository to your local machine:**
   git clone https://github.com/your-username/url-shortener.git

2. **Navigate to the Project Directory:**
   Open your terminal and change to the `url-shortener` project directory using the `cd` command.

3. **Install Dependencies:**
   Run the following command to install the required dependencies:
   ```bash
   npm install

3. **Start the Server:**
   Run the following command to install the required dependencies:
   ```bash
   npm start
   By default, the server will run on port 3000. You can customize the port by setting the `PORT` environment variable.

## Usage

- **Shorten a URL**: Use the `/url` endpoint to shorten a long URL. Simply provide the original URL, and our service will generate a short code.

```json
{
  "url": "https://www.example.com/long-url"
}
```

The response will include the shortened URL.

- **Access the Original URL**: 
To access the original URL associated with a short code, make a GET request to `/:code`, where `:code` represents the short code.

- **Retries for Failed Redirects**: 
Our service handles retries for failed redirects, attempting up to a maximum of 3 times using the `redirectWithRetry` function.

