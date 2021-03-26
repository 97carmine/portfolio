# Portfolio

Personal portfolio

## Develop

A file called **.web.env** is used where the following keys are stored.

> Note: Do not forget to change $VALUE for its corresponding values

```
EMAIL_USER=$VALUE
EMAIL_PASS=$VALUE
```

## Setup the systemd service

> Note: Do not forget to change $USER and $FOLDER_PATH for its corresponding values

```
[Unit]
Description=portfolio web in NodeJS
After=network.target

[Service]
Type=simple
User=$USER
WorkingDirectory=$FOLDER_PATH
ExecStart=yarn start:prod
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

## License

This project is licensed under [MIT](./LICENSE).
