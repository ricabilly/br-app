<template>
    <div class="container">
        <h1>Boulder hinzufügen</h1>
        <div class="boulder-form">
            <label for="name">Name</label>
            <input v-model="bname" name="name" placeholder="Name">

            <label for="description">Beschreibung</label>
            <input v-model="description" name="description" type="text" placeholder="Beschreibung">

            <label for="diff-select">Schwierigkeit</label>
            <select name="diff-select" id="diff-select" v-model="diff">
                <option value="" disabled selected hidden>Schwierigkeit</option>
                <option v-for="d in difficulties" :key="d" :value="d">{{d}}</option>
            </select>

            <label for="color-selector">Farbe</label>
            <select name="color-selector" id="color-selector" v-model="color">
                <option value="" disabled selected hidden>Farbe</option>
                <option v-for="d in colors" :key="d" :value="d">{{d}}</option>
            </select>

            <label for="sector-selector">Sektor</label>
            <select name="sector-selector" id="sector-selector" v-model="sector">
                <option value="" disabled selected hidden>Sektor</option>
                <option v-for="d in sectors" :key="d" :value="d">{{d}}</option>
            </select>

            <label for="creator">Made by</label>
            <input v-model="creator" name="creator" placeholder="Made by">

            <label for="image">Image</label>
            <input name="image" type="file" accept="image/*" @change="imgUploaded">

            <button class="submit-button" @click="submitBoulder">Fertig</button>
        </div>
    </div>
</template>
<script>
import {difficulties as diffs, colors, sectors} from "@/util/filter.js"

export default {
    name: "AddBoulder",
    data() {
        return {
            bname: "",
            diff: "",
            tags: [],
            image: null,
            creator: "",
            rating: 0,
            sector: "",
            color: "",
            description: "",

            difficulties: diffs,
            colors: colors,
            sectors: sectors,
        }
    },
    methods: {
        submitBoulder() {
            if(this.bname.length < 3) {
                alert("Der Name muss mindestens 3 Zeichen enthalten!");
                return;
            }
            if(this.creator == "") {
                alert("Bitte Schrauber:in angeben!");
                return;
            }
            if(this.difficulty == "") {
                alert("Bitte Schwierigkeit angeben!");
                return;
            }
            if(this.sector == "") {
                alert("Bitte Sektor angeben!");
                return;
            }
            if(this.color == "") {
                alert("Bitte Farbe angeben!");
                return;
            }

            let boulder = {
                id: 1,
                name: this.bname,
                difficulty: this.diff,
                tags: this.tags,
                image: this.image,
                date: null,
                creator: this.creator,
                rating: this.rating,
                sector: this.sector,
                color: this.color,
                description: this.description,
                comments: []
            }

            this.$store.commit('addBoulder', boulder);
            alert(this.bname + " wurde hinzugefügt");
            this.$router.push("/");
        },
        imgUploaded(e) {
            this.image = e.target.files[0];
            console.log(this.image);
        }
    },
}
</script>
<style lang="scss">

.boulder-form {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    text-align: left;
    margin-left: 10%;
}
    
input {
    margin-bottom: 1rem;

}

select {
    margin-bottom: 1rem;
}

.submit-button {
    grid-column: 1 / 3;
    width: 90%;
}
</style>