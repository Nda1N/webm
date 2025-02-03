// 動画のパスを指定
const videoPaths = {
    city1: ['human_tb.mp4', 'human_t.mp4'],
    city2: ['dog_tb.mp4', 'dog_t.mp4'],
    city3: ['cat_tb.webm', 'cat_t.webm'], // 'cat_t.webm' を追加
    city4: ['crow_tb.mp4', 'crow_t.mp4'],
    grass1: ['giraffe_tb.mp4', 'giraffe_t.mp4'],
    grass2: ['meerkat_tb.mp4', 'meerkat_t.mp4'],
    grass3: ['horse_tb.mp4', 'horse_t.mp4'],
    grass4: ['kangaroo_tb.mp4', 'kangaroo_t.mp4'],
    jungle1: ['gibbon_tb.mp4', 'gibbon_t.mp4'],
    jungle2: ['bear_tb.mp4', 'bear_t.mp4'],
    jungle3: ['ezorisu_tb.mp4', 'ezorisu_t.mp4'],
    jungle4: ['deer_tb.mp4', 'deer_t.mp4'],
    ocean1: ['penguin_tb.mp4', 'penguin_t.mp4'],
    ocean2: ['seal_tb.mp4', 'seal_t.mp4'],
    ocean3: ['seaotter_tb.mp4', 'seaotter_t.mp4'],
    ocean4: ['seaturtle_tb.mp4', 'seaturtle_t.mp4']
    
};
 // 動画パスを取得
    const videos = videoPaths[marker];
    if (videos) {
        videos.forEach(video => {
            const sourceElement = document.createElement('source');
            sourceElement.src = video;
            // 拡張子でタイプを判定
            if (video.endsWith('.webm')) {
                sourceElement.type = 'video/webm';
            } else if (video.endsWith('.mp4')) {
                sourceElement.type = 'video/mp4';
            }
            videoElement.appendChild(sourceElement);
        });

// ポップアップ表示のための関数
const showPopupVideo = (videoPaths) => {
    // ポップアップ用のコンテナを作成
    const popup = document.createElement('div');
    popup.id = 'video-popup';
    popup.style.position = 'fixed';
    popup.style.top = '0';
    popup.style.left = '0';
    popup.style.width = '100%';
    popup.style.height = '100%';
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    popup.style.display = 'flex';
    popup.style.justifyContent = 'center';
    popup.style.alignItems = 'center';
    popup.style.zIndex = '1000';

    // 動画要素を作成
    const video = document.createElement('video');
    video.src = videoPaths[1];  // 'cat_t.webm' を指定
    video.autoplay = true;
    video.controls = true;
    video.style.maxWidth = '90%';
    video.style.maxHeight = '90%';
    
    // ポップアップ内に動画を追加
    popup.appendChild(video);

    // 閉じるボタンを追加
    const closeButton = document.createElement('button');
    closeButton.innerText = '閉じる';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '20px';
    closeButton.style.right = '20px';
    closeButton.style.backgroundColor = 'red';
    closeButton.style.color = 'white';
    closeButton.style.border = 'none';
    closeButton.style.padding = '10px';
    closeButton.style.cursor = 'pointer';

    // 閉じるボタンがクリックされたらポップアップを閉じる
    closeButton.addEventListener('click', () => {
        popup.remove();
    });

    popup.appendChild(closeButton);

    // ポップアップをページに追加
    document.body.appendChild(popup);
};

// ページがロードされたときに cat_t.webm を自動再生
window.addEventListener('load', () => {
    showPopupVideo(videoPaths.city3);  // 'city3' に対応する動画（cat_t.webm）
});
