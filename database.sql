CREATE TABLE Diary (
    Id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    UserEmail VARCHAR(255) NOT NULL,
    Title VARCHAR(255) NOT NULL,
    Content TEXT DEFAULT NULL,
    IsPublished BOOL NOT NULL DEFAULT FALSE,
    CreatedTimestamp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PublishedTimestamp TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (Id)
);