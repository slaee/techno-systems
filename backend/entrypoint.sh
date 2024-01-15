#!/bin/sh
pip3 install -r /requirements.txt

# May as well do this too, while we're here.
python manage.py makemigrations && python manage.py migrate

# execs $CMD
exec "$@"