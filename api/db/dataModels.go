package db

// User data model
type User struct {
	Id        int64  `json:"id"`
	Firstname string `json:"firstname"`
	Lastname  string `json:"lastname"`
	Password  string `json:"password,omitempty"`
}

// Boulder data model
type Boulder struct {
	Id          int64      `json:"id"`
	Name        string     `json:"name"`
	Description string     `json:"description"`
	Color       string     `json:"color"`
	Difficulty  string     `json:"difficulty"`
	Rating      int        `json:"rating"`
	Creator     string     `json:"creator"`
	Date        string     `json:"date"`
	Sector      string     `json:"sector"`
	Image       string     `json:"image"`
	Comments    []*Comment `json:"comments"`
}

// Comment data model
type Comment struct {
	Id        int64  `json:"id"`
	BoulderId int64  `json: boulder`
	Author    string `json:"author"`
	Content   string `json:"content"`
	Date      string `json:"date"`
}
