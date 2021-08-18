
# Info

This package use PDM as a build system. No virtual environnement is require to run this project.


# Installation


## PDM 

First, install pdm:

```
python -m pip install --user pipx
python -m pipx ensurepath
pipx install pdm
```

Then, you need to activate the pep582 interface with:

`pdm --pep582 >> ~/.bash_profile`

reload your terminal and pdm will be ready. You can also use .bashrc if profile doesn't work on your system.


## Paruzorus

To install the environnement type:

`pdm install`

for developpement purpose, you can install the aiohttp devtools:

`pipx install aiohttp_devtools`

This allow to start the server in debug mode.

