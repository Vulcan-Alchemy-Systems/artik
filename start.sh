#!/bin/bash
export MONGO_URL=mongodb://iotnet:11akers32@35.227.149.62:27017/iotnet
meteor --release 1.4 --settings=settings.json --allow-incompatible-update
