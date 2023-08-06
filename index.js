const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const STORAGE_KEY_SONG = "songs";

const playList = $(".playlist");
const cd = $(".cd");
const heading = $("h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBTN = $(".btn-toggle-play");
const player = $(".player");
const progress = $(".progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");

// 1.render ok
//2.scroll bar ok
//3.load current Song ok
//4. playBTN ok
// 5.ranger ok
// 6.cdthumb xoay ok
// 7. next and previous BTN ok
// 8.random and repeat BTN ok.
//9.active and scrollintoview ok
//10.choose song and localStorage ok
// => finished.

const app = {
    // dat lenh
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(STORAGE_KEY_SONG)) || {},
    songs: [
        {
            name: "Click Pow Get Down",
            singer: "Raftaar x Fortnite",
            path: "./audio/ConMuaXaDan-SonTungMTP-8033250.mp3",
            image: "https://i.ytimg.com/vi/jTLhQf5KJSc/maxresdefault.jpg",
        },
        {
            name: "Tu Phir Se Aana",
            singer: "Raftaar x Salim Merchant x Karma",
            path: "./audio/DduduDduduRemixVersion-BLACKPINK-6291966.mp3",
            image: "https://1.bp.blogspot.com/-kX21dGUuTdM/X85ij1SBeEI/AAAAAAAAKK4/feboCtDKkls19cZw3glZWRdJ6J8alCm-gCNcBGAsYHQ/s16000/Tu%2BAana%2BPhir%2BSe%2BRap%2BSong%2BLyrics%2BBy%2BRaftaar.jpg",
        },
        {
            name: "Naachne Ka Shaunq",
            singer: "Raftaar x Brobha V",
            path: "./audio/DeMuaChoEmMotDoaHoaHongXinhYeuXa-dNam-9677724.mp3",
            image: "https://i.ytimg.com/vi/QvswgfLDuPg/maxresdefault.jpg",
        },
        {
            name: "Mantoiyat",
            singer: "Raftaar x Nawazuddin Siddiqui",
            path: "HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3",
            image: "https://a10.gaanacdn.com/images/song/39/24225939/crop_480x480_1536749130.jpg",
        },
        {
            name: "Aage Chal",
            singer: "Raftaar",
            path: "./audio/KillThisLove-BLACKPINK-6291967.mp3",
            image: "https://a10.gaanacdn.com/images/albums/72/3019572/crop_480x480_3019572.jpg",
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path: "./audio/NangAmNgangQua-SonTungMTP-8033251.mp3",
            image: "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg",
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./audio/ThangNamSpecialPerformance-SoobinHoangSonSlimV-7020121.mp3",
            image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path: "./audio/TinhNaoKhongNhuTinhDau-TrungQuanIdol-6588171.mp3",
            image: "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg",
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./audio/YeuEmRatNhieu-HoangTon-7031755.mp3",
            image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
        },
        {
            name: "Damn",
            singer: "Raftaar x kr$na",
            path: "./audio/YeuEmRatNhieu-HoangTon-7031755.mp3",
            image: "https://filmisongs.xyz/wp-content/uploads/2020/07/Damn-Song-Raftaar-KrNa.jpg",
        },
        {
            name: "Feeling You",
            singer: "Raftaar x Harjas",
            path: "./audio/YeuEmRatNhieu-HoangTon-7031755.mp3",
            image: "https://a10.gaanacdn.com/gn_img/albums/YoEWlabzXB/oEWlj5gYKz/size_xxl_1586752323.webp",
        },
    ],

    start: function () {
        // create properties currentSong
        this.defineProperties();

        // take current song
        this.loadCurrentSong();

        // config
        this.loadConFig();

        // events
        this.event();

        // render
        this.render();

        // change icon button
        randomBtn.classList.toggle("active", this.isRandom);
        repeatBtn.classList.toggle("active", this.isRepeat);
    },
    // chu y dau phay

    // function
    render: function () {
        const htmls = this.songs.map((song, index) => {
            return `
<div class="song ${
                index === this.currentIndex ? "active" : ""
            }" data-index="${index}">
<div
    class="thumb"
    style="
        background-image: url(${song.image});
    "
></div>
<div class="body">
    <h3 class="title">${song.name}</h3>
    <p class="author">${song.singer}</p>
</div>
<div class="option">
    <i class="fas fa-ellipsis-h"></i>
</div>
</div>

`;
        });
        playList.innerHTML = htmls.join("");
    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },

    loadCurrentSong: function () {
        heading.textContent = this.currentSong.name;
        audio.src = this.currentSong.path;
        cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong();
    },

    prevSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong();
    },

    randomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
    },

    loadActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "center",
                // ok nha
            });
        }, 300);
    },

    isConFig: function (key, value) {
        this.config[key] = value;
        localStorage.setItem(STORAGE_KEY_SONG, JSON.stringify(this.config));
    },

    loadConFig: function () {
        this.isRandom = this.config.isRandom;
        this.isRepeat = this.config.isRepeat;
    },

    // EVENTS
    event: function () {
        const _this = this;

        // cdthumb
        const cdThumbAnimate = cdThumb.animate(
            [{ transform: "rotate(360deg)" }],
            { duration: 10000, iterations: Infinity }
        );
        cdThumbAnimate.pause();
        // scroll top
        const cdWidth = cd.offsetWidth;
        document.onscroll = function () {
            const scrollTop =
                window.scrollY || document.documentElement.scrollTop;
            const cdNew = cdWidth - scrollTop;
            cd.style.width = cdNew + "px";
            cd.style.opacity = cdNew > 0 ? cdNew / cdWidth : 0;
        };

        // button play
        playBTN.onclick = function () {
            if (_this.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
        };

        audio.onplay = function () {
            _this.isPlaying = true;
            player.classList.add("playing");
            cdThumbAnimate.play();
        };

        audio.onpause = function () {
            _this.isPlaying = false;
            player.classList.remove("playing");
            cdThumbAnimate.pause();
        };

        // ranger
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent =
                    (audio.currentTime / audio.duration) * 100;
                progress.value = progressPercent;
            }
        };
        progress.onchange = function (e) {
            const seekTime = (e.target.value / 100) * audio.duration;
            audio.currentTime = seekTime;
        };

        // next button
        nextBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.nextSong();
            }
            audio.play();
            _this.loadActiveSong();
            _this.render();
        };

        // prev button
        prevBtn.onclick = function () {
            if (_this.isRandom) {
                _this.randomSong();
            } else {
                _this.prevSong();
            }
            audio.play();
            _this.render();
            _this.loadActiveSong();
        };

        // random btn
        randomBtn.onclick = function () {
            _this.isRandom = !_this.isRandom;
            randomBtn.classList.toggle("active", _this.isRandom);
            _this.isConFig("isRandom", _this.isRandom);
            // luu duoi dang chuoi nha
        };

        // repeat button
        repeatBtn.onclick = function () {
            _this.isRepeat = !_this.isRepeat;
            repeatBtn.classList.toggle("active", _this.isRepeat);
            _this.isConFig("isRepeat", _this.isRepeat);
        };

        // audio repeat button
        audio.onended = function () {
            if (_this.isRepeat) {
                audio.play();
            } else {
                nextBtn.click();
            }
        };

        playList.onclick = function (e) {
            const activeSong = e.target.closest(".song:not(.active)");
            if (activeSong || e.target.closest(".option")) {
                if (activeSong) {
                    _this.currentIndex = Number(activeSong.dataset.index);
                    _this.loadCurrentSong();
                    _this.render();
                    audio.play();
                }
            }
        };
    },
};

app.start();
