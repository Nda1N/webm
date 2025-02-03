// 動画のパスを指定
const videoPaths = {
    city1: ['t/human_t.mov', 'tb/human_tb.mov'],
    city2: ['t/dog_t.mov', 'tb/dog_tb.mov'],
    city3: ['cat_t.webm', 'cat_tb.webm'], // 'cat_t.webm' を追加
    city4: ['t/crow_t.mov', 'tb/crow_tb.mov'],
    grass1: ['t/giraffe_t.mov', 'tb/giraffe_tb.mov'],
    grass2: ['t/meerkat_t.mov', 'tb/meerkat_tb.mov'],
    grass3: ['t/horse_t.mov', 'tb/horse_tb.mov'],
    grass4: ['t/kangaroo_t.mov', 'tb/kangaroo_tb.mov'],
    jungle1: ['t/gibbon_t.mov', 'tb/gibbon_tb.mov'],
    jungle2: ['t/bear_t.mov', 'tb/bear_tb.mov'],
    jungle3: ['t/ezorisu_t.mov', 'tb/ezorisu_tb.mov'],
    jungle4: ['t/deer_t.mov', 'tb/deer_tb.mov'],
    ocean1: ['t/penguin_t.mov', 'tb/penguin_tb.mov'],
    ocean2: ['t/seal_t.mov', 'tb/seal_tb.mov'],
    ocean3: ['t/seaotter_t.mov', 'tb/seaotter_tb.mov'],
    ocean4: ['t/seaturtle_t.mov', 'tb/seaturtle_tb.mov']
};

// 再生中のフラグと現在の動画インデックス
let isPlaying = false;
let currentVideoIndex = 0;

// 動画を事前に読み込む関数
const preloadVideos = () => {
    Object.values(videoPaths).forEach(paths => {
        paths.forEach(path => {
            const video = document.createElement('video');
            video.src = path;
            video.preload = 'auto';
            video.load();
            video.muted = true;
        });
    });
};

// 動画の表示を管理する関数
const showPopupVideo = (videoArray) => {
    const videoElement = document.createElement('video');
    videoElement.src = videoArray[currentVideoIndex];
    videoElement.autoplay = true;
    videoElement.controls = true;
    videoElement.style.width = '100%';  // 動画サイズを調整
    videoElement.style.height = 'auto';  // 動画サイズを調整

    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.appendChild(videoElement);

    document.body.appendChild(popup);

    // 動画終了後にポップアップを閉じる
    videoElement.onended = () => {
        popup.remove();
    };
};

// マーカーが見つかったときの処理
const markerFound = (markerId) => {
    if (isPlaying) {
        return;
    }
    isPlaying = true;
    // 新しい動画を再生
    showPopupVideo(videoPaths[markerId]);
    updateMarkerStatus(true);  // マーカーが表示されたら再生中フラグを更新
};

// マーカーが見つからなかったときの処理
const markerNotFound = () => {
    if (isPlaying) {
        isPlaying = false;
        updateMarkerStatus(false);  // 再生終了時にフラグをリセット
    }
};

// マーカーの状態を更新する関数
const updateMarkerStatus = (status) => {
    const markerStatusElement = document.getElementById('markerStatus');
    if (status) {
        markerStatusElement.innerText = 'Marker detected: Playing';
    } else {
        markerStatusElement.innerText = 'No marker detected';
    }
};

// ページロード時に cat_t.webm を自動再生
window.addEventListener('load', () => {
    preloadVideos();
    // 初期状態で cat_t.webm を再生
    showPopupVideo(videoPaths.city3);  // 'city3' に対応する動画（cat_t.webm）
    updateMarkerStatus(false); // 初期状態はマーカー非表示
});

// AR.js のイベントリスナー
AFRAME.registerComponent('markerhandler', {
    init: function () {
        const marker = this.el;
        marker.addEventListener('markerFound', (event) => {
            const markerId = event.target.id;
            markerFound(markerId);
        });
        marker.addEventListener('markerLost', () => {
            markerNotFound();
        });
    }
});
