# Workout Manager

This project was created to help me stay on track to complete workouts and physical therapy each week. The user can create a workout with a name, description, and image and then mark it as complete each week. You can scroll through previous and future weeks to see what workouts you completed each week.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine

### Prerequisites

What things you need to install the software and how to install them

1. NodeJS installation
2. Either a local MongoDB instance or a remote Mongo provider like [Mlab](https://mlab.com/)

### Installing

A step by step series of examples that tell you have to get a development env running

install npm dependencies

```
npm install
```

install bower dependencies

```
npm install bower
bower install
```

### Configuration

In the root folder, there is a settings.json folder. Within it, place the URL for your mongoDB. I recommend MongoLab's free option so you don't have to go through the hassle of a local installation

```
{
  "mongoUrl": "<mongo db URL goes here>"
}
```

## Built With

* [NodeJS](https://nodejs.org/en/)
* [Express](https://www.npmjs.com/package/express)
* [Mongoose](https://www.npmjs.com/package/mongoose)


## Authors

* **Sawyer Burnett** - *Initial work*
