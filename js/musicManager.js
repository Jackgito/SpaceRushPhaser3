let instance = null;

// Controls when to play and stop selected song
export default class MusicManager {
    constructor(scene) {
        if (!instance) {
            instance = this;
            this.scene = scene;
            this.songs = {
                musicElectroman: {
                    key: "musicElectroman",
                    title: "Waterflame - Electroman Adventures",
                },
                musicOverkill: {
                    key: "musicOverkill",
                    title: "RIOT - Overkill",
                },
                musicOneAgainst: {
                    key: "musicOneAgainst",
                    title: "Antti Martikainen - One Against the World",
                },
            };
            this.currentSong = this.songs.musicElectroman;
            this.music = null;
        }

        return instance;
    }

    playSong(scene) {
        if (this.music) {
            this.music.stop();
        }

        const { key, title } = this.currentSong;

        this.music = scene.sound.add(key, {
            loop: true,
            volume: 0.2,
            delay: 0.5,
            seek: 0,
        });

        this.music.play();
    }

    stopSong() {
        if (this.music) {
            this.music.stop();
        }
    }

    selectSong(songKey) {
        console.log(songKey);
        this.currentSong = this.songs[songKey];
    }

    getCurrentSongTitle() {
        return this.currentSong.title;
    }

    getCurrentSongKey() {
        return this.currentSong.key;
    }
}
