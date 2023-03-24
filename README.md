<h1 align="center">YAML Outputs Action 🚀</h1>

This GitHub Action reads a YAML file and flattens it recursively into a set of output parameters.

## Inputs 📝

### `file-path`

**Required** The path of the YAML file to read.

### `separator`

The separator used to concatenate child properties. For example, if the YAML file contains:

```yaml
root:
  parent:
    child: true
```

then setting separator to '__' would result in the output parameter root__parent__child being set to true.

Default: '__'

### `export-env-variables`

It controls whether outputs are exported as environment variables or not. Default: true.

## Outputs 📜
This action generates one output parameter for each key in the flattened YAML file. The name of each output parameter is the concatenation of the flattened key and the separator.

## Usage 📚

Given a YAML file `.github/test-file.yaml` with the following properties:

```yaml
root:
  parent:
    child_1: "my_string_111"
    child_2: 112
```

we can use the action to get the properties as flattened outputs:

```yaml
name: 'read-yaml'
on:
  push:
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions-tools/read-yaml@v1
        id: yaml
        with:
          file-path: '.github/test-file.yaml'
          separator: '__'
      - run: |
          echo "${{ steps.yaml.outputs.root__parent__child_1 }}"
          echo "${{ steps.yaml.outputs.root__parent__child_2 }}"
```
