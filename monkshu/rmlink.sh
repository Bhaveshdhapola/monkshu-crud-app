#!/bin/bash
CURPATH="$( cd "$( dirname "$0" )" && pwd )"

rm $CURPATH/backend/apps
rm $CURPATH/frontend/apps

echo Done.
