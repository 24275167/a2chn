-- Create CATEGORY table
CREATE TABLE CATEGORY (
  CATEGORY_ID INT PRIMARY KEY AUTO_INCREMENT,
  NAME VARCHAR(100) NOT NULL
);
-- Create FUNDRAISER table
CREATE TABLE FUNDRAISER (
  FUNDRAISER_ID INT PRIMARY KEY AUTO_INCREMENT,
  ORGANIZER VARCHAR(255) NOT NULL,
  CAPTION VARCHAR(255),
  TARGET_FUNDING DECIMAL(10, 2),
  CURRENT_FUNDING DECIMAL(10, 2) DEFAULT 0,
  CITY VARCHAR(100),
  ACTIVE BOOLEAN DEFAULT TRUE,
  CATEGORY_ID INT,
  FOREIGN KEY (CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID)
);
-- Add CATEGORY data
INSERT INTO CATEGORY (NAME) VALUES ('Animal Welfare'), ('Environment'), ('Arts & Culture');
-- Add FUNDRAISER data
INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) 
VALUES 
  ('Emily', 'Animal Rescue Mission Expansion', 10000, 6500, 'Adelaide', TRUE, 1),
  ('Ethan', 'Reforestation of Community Lands', 5000, 3200, 'Brisbane', TRUE, 2),
  ('Charlotte', 'Art Supplies for Youth Programs', 4000, 2900, 'Gold Coast', TRUE, 3),
  ('Harper', 'Clean Energy for Rural Schools', 16000, 13200, 'Hobart', TRUE, 2),
  ('Grace', 'Rebuilding Animal Shelter After Storm', 7000, 5000, 'Sydney', TRUE, 1),
  ('Chloe', 'Expand Wildlife Protection Area', 13000, 9300, 'Adelaide', TRUE, 1),
  ('Daniel', 'Fund for Community Green Spaces', 6000, 4500, 'Brisbane', TRUE, 2),
  ('Sofia', 'Support Local Music Festivals', 7000, 4800, 'Gold Coast', TRUE, 3),
  ('Ella', 'Clean Water Initiative for Drought Areas', 18000, 14500, 'Hobart', TRUE, 2),
  ('Ava', 'Library Resources for Children', 15000, 11200, 'Perth', TRUE, 1);
