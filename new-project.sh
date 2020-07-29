#!/usr/bin/env bash

echo "How many different entities (database tables) would you like to the user to own?"
read numberOfEntities
if ! [[ "$numberOfEntities" =~ ^[0-9]+$ ]]
    then
        echo "Sorry integers only, start again."
	exit 0
fi

Tables=()

echo "The user table will be created automatically, you do NOT need to type 'users' here. Please give the name of each other table in turn. Type these in **camelCase**, in the plural form, and separate multiple words with a space. E.g if the user will own fridge magnets then type 'fridgeMagnets', alternatively you might type 'parties'"

for ((i = 1 ; i <= $numberOfEntities; i++)); do
  echo "Whats the name of Table $i?"
  read tableName		
  Tables+=($tableName)
done

echo ${Tables[@]}

echo "Go? Press enter to build your app's code!"
read nothing

for ((i = 0 ; i < ${#Tables[@]}; i++)); do
  cp -R ./server/src/components/ProtectedThing ./server/src/components/${Tables[$i]}
done
