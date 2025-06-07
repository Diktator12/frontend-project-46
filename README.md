# 📘 GENDIFF

[![Actions Status](https://github.com/Diktator12/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/Diktator12/frontend-project-46/actions) [![Test and Lint](https://github.com/Diktator12/frontend-project-46/actions/workflows/test-and-lint.yml/badge.svg)](https://github.com/Diktator12/frontend-project-46/actions/workflows/test-and-lint.yml) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Diktator12_frontend-project-46&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Diktator12_frontend-project-46)

## 📌 Description
**Gendiff** is a CLI utility that compares two configuration files and displays the differences between them.

Supports:

- Formats: **JSON**, **YAML**
- Output: `stylish`, `plain`, `json`
- Comparison of **nested structures**

## 📦 Installation
```bash
git clone git@github.com:Diktator12/frontend-project-46.git

make install
```
## 🧪 Test
#### Gendiff uses **JEST** for unit testing
```bash
make test
```
#### To see test coverage:
```bash
make test-coverage
```
## 🚀 Usage
```bash
gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format
  -h, --help           display help for command
```
## 📋 Examples
#### 🔸 Stylish (default)
```bash
$ gendiff file1.json file2.json
```
```text
common: {
    setting1: value1
  - setting2: 200
  + setting3: null
    nested: {
      - key: old
      + key: new
        flag: true
      + extra: added
    }
}
```
#### 🔹 Plain
```bash
$ gendiff --format plain file1.json file2.json
```
```text
Property 'common.setting2' was removed
Property 'common.setting3' was added with value: null
Property 'common.nested.key' was updated. From 'old' to 'new'
Property 'common.nested.extra' was added with value: 'added'
```
#### 🔹 Json
```bash
$ gendiff --format json file1.json file2.json
```
```text
[
  {
    "key": "common",
    "type": "nested",
    "children": [
      {
        "key": "setting1",
        "type": "unchanged",
        "value": "value1"
      },
      {
        "key": "setting2",
        "type": "removed",
        "value": 200
      },
      {
        "key": "setting3",
        "type": "added",
        "value": null
      },
      {
        "key": "nested",
        "type": "nested",
        "children": [
          {
            "key": "key",
            "type": "updated",
            "oldValue": "old",
            "newValue": "new"
          },
          {
            "key": "flag",
            "type": "unchanged",
            "value": true
          },
          {
            "key": "extra",
            "type": "added",
            "value": "added"
          }
        ]
      }
    ]
  }
]
```
