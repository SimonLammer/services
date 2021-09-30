REDMINE_DB_CONTAINER_NAME = redmine_db_1
REDMINE_USERNAME = redmine
REDMINE_DB_NAME = redmine

TIMESTAMP = ${shell date +%Y%m%dT%H%M%S}
DB_BACKUP_FILENAME = ${REDMINE_DB_NAME}-${TIMESTAMP}.sqlc
TAR_BACKUP_FILENAME = backups/redmine-${TIMESTAMP}.tar.gz

backup: # https://www.redmine.org/projects/redmine/wiki/RedmineBackupRestore
	# restore with pg_restore -U redmine -d redmine redmine.sqlc
	docker exec ${REDMINE_DB_CONTAINER_NAME} pg_dump -U ${REDMINE_USERNAME} -Fc ${REDMINE_DB_NAME} > ${DB_BACKUP_FILENAME}
	tar -czf ${TAR_BACKUP_FILENAME} ${DB_BACKUP_FILENAME} volumes/redmine/files
	rm ${DB_BACKUP_FILENAME}

