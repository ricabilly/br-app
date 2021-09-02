// Package db provides database functionality
package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

const dburl = "localhost"
const dbuser = "api"
const dbpw = "dbpw123"
const dbname = "br-app"

var client *sql.DB

func init() {
	Connect()
}

// Connect establishes a connection to the database.
func Connect() {
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(%s:3306)/%s", dbuser, dbpw, dburl, dbname))
	if err != nil {
		log.Fatal(err)
	}

	err = db.Ping()

	if err != nil {
		log.Fatal(err)
	}

	client = db
	fmt.Println("Connection to databse established")
}

// Disconnect closes the connection to the database.
func Disconnect() {
	client.Close()
}

// GetBoulders fetches all boulders from the database.
// It returns a slice of Boulder objects.
func GetBoulders() ([]*Boulder, error) {
	result, err := client.Query("SELECT * FROM boulders")
	if err != nil {
		return nil, err
	}
	var boulders []*Boulder
	comments, err := getComments()
	if err != nil {
		return nil, err
	}

	for result.Next() {
		b := new(Boulder)
		err := result.Scan(
			&b.Id,
			&b.Name,
			&b.Description,
			&b.Color,
			&b.Difficulty,
			&b.Rating,
			&b.Creator,
			&b.Date,
			&b.Sector,
			&b.Image,
		)

		if err != nil {
			return nil, err
		}

		for _, c := range comments {
			if c.BoulderId == b.Id {
				b.Comments = append(b.Comments, c)
			}
		}

		boulders = append(boulders, b)
	}

	return boulders, nil
}

// editBoulder updates a boulder record or inserts a new one.
// It returns false if a new boulder was added and true if an existing one was updated.
func EditBoulder(boulder *Boulder) (*Boulder, error) {
	if boulder.Id < 0 {
		result, err := client.Exec("INSERT INTO boulders (name, description, color, difficulty, rating, creator, date, sector, image) VALUES (?, ? ,?, ?, ?, ?, ?, ?, ?) ",
			boulder.Name, boulder.Description, boulder.Color, boulder.Difficulty, boulder.Rating, boulder.Creator, boulder.Date, boulder.Sector, boulder.Image)
		if err != nil {
			log.Fatal(err)
			return nil, err
		}
		boulder.Id, _ = result.LastInsertId()
		return boulder, err

	} else {
		_, err := client.Exec("UPDATE boulders SET name=?, description=?, color=?, difficulty=?, rating=?, creator=?, date=?, sector=?, image=? WHERE id = ?",
			boulder.Name, boulder.Description, boulder.Color, boulder.Difficulty, boulder.Rating, boulder.Creator, boulder.Date, boulder.Sector, boulder.Image, boulder.Id)
		if err != nil {
			log.Fatal(err)
			return nil, err
		}
		return boulder, err
	}
}

// getComments fetches all comments from the database.
// It returns a slice of Comment objects.
func getComments() ([]*Comment, error) {
	result, err := client.Query("SELECT * FROM comments")
	if err != nil {
		return nil, err
	}
	var comments []*Comment

	for result.Next() {
		c := new(Comment)
		err := result.Scan(
			&c.Id,
			&c.BoulderId,
			&c.Author,
			&c.Content,
			&c.Date,
		)

		if err != nil {
			return nil, err
		}

		comments = append(comments, c)
	}

	return comments, nil
}

// editComment updates a comment record or inserts a new one.
// It returns false if a new comment was added and true if an existing one was updated.
func editComment(comment *Comment) (bool, error) {
	if comment.Id < 0 {
		_, err := client.Exec("INSERT INTO comments (boulderId, author, content, date) VALUES (?, ? ,?, ?) ",
			comment.BoulderId, comment.Author, comment.Content, comment.Date)
		return false, err

	} else {
		_, err := client.Exec("UPDATE comments SET boulderId=?, author=?, content=?, date=? WHERE id = ?",
			comment.BoulderId, comment.Author, comment.Content, comment.Date, comment.Id)
		return true, err
	}
}

// getUsers fetches all users from the database.
// It returns a slice of User objects.
func getUsers() ([]*User, error) {
	result, err := client.Query("SELECT * FROM users")
	if err != nil {
		return nil, err
	}
	var users []*User

	for result.Next() {
		u := new(User)
		err := result.Scan(
			&u.Id,
			&u.Firstname,
			&u.Lastname,
		)

		if err != nil {
			return nil, err
		}

		users = append(users, u)
	}

	return users, nil
}

// getUser fetches a specific user based on their id.
// It returns a User object.
func getUser(id int64) (*User, error) {
	result, err := client.Query("SELECT * FROM users WHERE id = ?", id)
	if err != nil {
		return nil, err
	}
	user := new(User)

	for result.Next() {
		err := result.Scan(
			&user.Id,
			&user.Firstname,
			&user.Lastname,
			&user.Password,
		)

		if err != nil {
			return nil, err
		}
	}
	return user, nil
}

// editUser updates a user record or inserts a new one.
// It returns false if a new user was added and true if an existing one was updated.
func editUser(user *User) (bool, error) {
	if user.Id < 0 {
		_, err := client.Exec("INSERT INTO users (firstname, lastname, password) VALUES (?, ? ,?) ",
			user.Firstname, user.Lastname, user.Password)
		return false, err

	} else {
		_, err := client.Exec("UPDATE users SET firstname=?, lastname=?, password=? WHERE id = ?",
			user.Firstname, user.Lastname, user.Password, user.Id)
		return true, err
	}
}
