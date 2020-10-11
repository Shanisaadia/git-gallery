var gProj;


gProj = [

    {
        id: "minesweeper",
        name: "Mine Sweeper",
        title: "Find all mines!",
        desc: "Minesweeper is a single-player puzzle video game. The objective of the game is to clear a rectangular board containing hidden \"mines\" or bombs without detonating any of them.",
        url: "projs/mine-sweeper",
        publishedAt: 1589993942000,
        labels: ["minesweeper", "keyboard events"],
    },

    {
        id: "safecontent",
        name: "Safe Content",
        title: "Explore login!",
        desc: "User management tool, explore login, logout and admin access.",
        url: "projs/safe-content",
        publishedAt: 1588993942000,
        labels: ["safe-content", "keyboard events"],
    },

    {
        id: "bookshop",
        name: "Book Shop",
        title: "Manage your own Book shop",
        desc: "Book shop management tool, easily manage your store.",
        url: "projs/book-shop",
        publishedAt: 1587993942000,
        labels: ["book-shop", "keyboard events"],
    },

    {
        id: "misterchess",
        name: "Mister Chess",
        title: "Let's play Chess!",
        desc: "Chess is a two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 square grid.",
        url: "projs/mister-chess",
        publishedAt: 1586909394200,
        labels: ["book-shop", "keyboard events"],
    },

    {
        id: "pacman",
        name: "Pacman",
        title: "Let's play Pacman!",
        desc: "Pac-Man is a maze chase video game; the player controls the eponymous character through an enclosed maze. The objective of the game is to eat all of the dots placed in the maze while avoiding four colored ghosts that pursue him.",
        url: "projs/pacman",
        publishedAt: 1588693942000,
        labels: ["book-shop", "keyboard events"],
    },

    {
        id: "ballboard",
        name: "Ball Board",
        title: "Catch the ball",
        desc: "Try to catch the ball.",
        url: "projs/ball-board",
        publishedAt: 1586909394200,
        labels: ["book-shop", "keyboard events"],
    },

]


function getProjsForDisplay() {
    projs = gProj;
    return projs;
}

function getProjById(projId) {
    var proj = gProj.find(function (proj) {
        return projId === proj.id
    })
    return proj
}




