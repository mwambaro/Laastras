# [Laastras](https://laastras.herokuapp.comm)

Leadership as a Service (LaaS) policy web application.

## Versions and dependencies

Check the [Gemfile](./Gemfile) for ample details about some package dependencies and 
versions of back-end modules like Ruby, Ruby on Rails.

## System dependencies

Install [npm](https://www.npmjs.com/get-npm) and [yarn](https://yarnpkg.com/getting-started/install) for front-end package needs like webpack, etc.
Install [ruby](https://rubyinstaller.org/) version 2.7 and [rails](https://www.tutorialspoint.com/ruby-on-rails/rails-installation.htm). Make sure the four components work well.
    
    - NPM:
        `npm --version` (We used version 6.14.10)
    - YARN:
        `yarn --version` (We used version 1.22.5)
    - RUBY:
        `ruby --version` (We used version 2.7.2p137)
    - RAILS:
        `rails --version` (We used version 6.1.3)

## Configuration

* Setup dependencies

    - React:
        `bundle install`
        `rails webpacker:install`
        `rails webpacker:install:react`
        `rails generate react:install`
    - Bootstrap, jQuery, and Popper:
        `yarn add bootstrap jquery popperjs`

* Database creation

We use PostgreSQL in development and production. So make sure you have a working PostgreSQL
setup. To make sure you are set:
    - POSTGRESQL:
        `psql --version` (We used psql version 12.5)

* Database initialization

Using psql cli for PostgreSQL, log in to the admin database using admin credentials supplied while installing PostgreSQL. Then, create two databases with the following information
    - LOGIN: 
        `psql -U postgres` (Assuming you kept the 'postgres' default admin user)
    - Database named worldcitizen_development:
        username: busydog
        password: wellington
        `CREATE ROLE busydog WITH PASSWORD 'wellington' CREATEDB`
        `CREATE DATABASE worldcitizen_development OWNER busydog`
    - Database named worldcitizen_test:
        username: busydog
        password: wellington
        `CREATE DATABASE worldcitizen_test OWNER busydog`

* How to run the test suite


* Deployment instructions

Just push/merge to the master branch as it is CI/CD'ed with Heroku.
