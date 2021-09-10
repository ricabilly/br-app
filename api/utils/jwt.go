package utils

import (
	"log"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type userClaims struct {
	jwt.StandardClaims
}

var mySigningKey []byte = []byte("key123")

func CreateJWT(sub string) (string, error) {
	exp := time.Now().Add(time.Hour * 24 * 30).Unix()
	claims := userClaims{
		jwt.StandardClaims{
			ExpiresAt: exp,
			Issuer:    "api",
			Subject:   sub,
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(mySigningKey)
}

func ValidateJWT(tokenString string) error {
	token, err := jwt.ParseWithClaims(tokenString, &userClaims{}, func(token *jwt.Token) (interface{}, error) {
		return mySigningKey, nil
	})

	if claims, ok := token.Claims.(*userClaims); ok && token.Valid {
		log.Printf("Token is valid for user %s\n", claims.StandardClaims.Subject)
	} else {
		log.Println(err)
	}
	return err
}
