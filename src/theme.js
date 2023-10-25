function SetTheme() {
    let themeMode = window.localStorage.getItem("lightMode");

    if (themeMode === null || themeMode === '') {
        window.localStorage.setItem("lightMode", true);
    }
}

SetTheme();