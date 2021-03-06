export const colors = [
    "ROT",
    "BLAU",
    "GELB",
    "GRÜN",
    "BRAUN",
    "LURCHI",
    "SCHWARZ",
    "GRAU",
    "ROT-MEILLIERT",
    "BLAU-MEILLIERT",
    "GELB-MEILLIERT",
    "GRÜN-MEILLIERT",
    "SCHWARZ-MEILLIERT",
    "NATURSTEIN",
    "STRUKTUR",
    "EISBERGE",
    "BUNT"
];

export const sectors = ["A", "B", "C", "D", "E", "F", "G", "H", "DECKE"];

export const difficulties = ["B1", "B1-2", "B2", "B2-3", "B3", "B3-4", "B4", "B4-5", "B5", "B5-6", "B6"];

function contains(s1, s2) {
    if(s1 != null && s1.length > 0) {
        return s1.indexOf(s2) != -1;
    }
    return true;
}

export function getMatches(text, boulders) {
    let slices = text.toUpperCase().split(" ");
    
    let color = [];
    let sector = [];
    let difficulty = [];
    let tags = [];
    

    slices.forEach((val, i) => {
        if(val == "") {
            return
        } else if(contains(sectors, val) && i > 0 && (slices[i-1] == "SEKTOR" || slices[i-1] == "SECTOR")) {
            sector.push(val);
        } else if(contains(colors, val)) {
            color.push(val);
        } else if(contains(difficulties, val)) {
            difficulty.push(val);
        } else if(val != "SEKTOR" && val != "SECTOR") {
            tags.push(val);
        }
    });

    return boulders.filter((val) => {

        let creatorMatch = false;
        let clonedTags = [...tags]

        for(let i = 0; i < clonedTags.length; i++) {
            if(clonedTags[i] == val.creator.toUpperCase()) {
                clonedTags.splice(i, 1);
                creatorMatch = true;
            }
        }

        return contains(color, val.color.toUpperCase()) 
            && contains(sector, val.sector.toUpperCase()) 
            && contains(difficulty, val.difficulty.toUpperCase())
            && (clonedTags.length === 0 || creatorMatch || contains(val.name.toUpperCase(), tags.join(" ")));
    });
}
