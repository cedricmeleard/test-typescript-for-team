export function randomImage(images? : Number[]) : string {
    const unwanted = [1, 5, 9, 13, 14, 16, 30, 36, 37, 41, 42, 52, 69, 75, 80, 81, 89, 92, 98];

    if (!images) images = [];

    let random = Math.floor(Math.random() * 100);
    while ( unwanted.indexOf(random) !== -1 || images.indexOf(random) !== -1) {
        random = Math.floor(Math.random() * 100);
    }
    
    images.push(random);

    return `https://randomuser.me/api/portraits/women/${random.toString()}.jpg`;
}