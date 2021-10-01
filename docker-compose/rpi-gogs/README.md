# Setup

1. Start the container to create the default configuration.

    `docker-compose up -d`

1. Connect to the container via the browser for the first-time installation.

    You can essentially skip the configuration, since we'll override it in the configuration file shortly.
    
    Make sure to create an admin account though.

1. Stop the container.

    `docker-compose stop`

3. Stop the container once it has fully started.
4. Edit `data/gogs/conf/app.ini`:

    1. `[server]`:
    
        1. `DOMAIN = myurl.example.com`
        1. `ROOT_URL = https://myurl.example.com/`
        1. `SSH_PORT = 22222`
    
    1. `[mailer]`: (Assuming you set up a Google account to send mails from)

        1. `ENABLED = true`
        2. `MAILER_TYPE = smtp`
        3. `HOST = smtp.gmail.com:465`
        4. `FROM = email@gmail.com`
        4. `USER = email@gmail.com`
        5. `PASSWD = password`
        6. `ID_TLS_ENABLED = true`

Resources:
- https://blog.hypriot.com/post/run-your-own-github-like-service-with-docker/
