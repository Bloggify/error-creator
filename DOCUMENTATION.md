## Documentation

You can see below the API reference of this module.

### `ErrorCreator(errors)`
Creates a new instance of `ErrorCreator`.

#### Params

- **Object** `errors`: = {} An object containing the errors' information. This is passed to the `add` method.

### `setLang(lang)`
Sets the preffered error language.

#### Params

- **String** `lang`: A preffered language for erro messages.

#### Return
- **ErrorCreator** The `ErrorCreator` instance.

### `add(name, err)`
Adds one or more error objects.

#### Params

- **String|Object** `name`: The error name. If an object, it should look like this:
   ```js
   {
      USER_NOT_FOUND: {
         message: "The user was not found.",
         status: 404
      },
      ARTICLE_NOT_FOUND: {
         message: "The article was not found.",
         status: 404
      }
   }
   ```
- **Object** `err`: The error message or object containing th message.

#### Return
- **ErrorCreator** The `ErrorCreator` instance.

