// ==UserScript==
// @name               Auto Skip YouTube Ads
// @name:vi            Tự Động Bỏ Qua Quảng Cáo YouTube
// @name:zh-CN         自动跳过 YouTube 广告
// @name:zh-TW         自動跳過 YouTube 廣告
// @name:ja            YouTube 広告を自動スキップ
// @name:ko            YouTube 광고 자동 건너뛰기
// @name:es            Saltar Automáticamente Anuncios De YouTube
// @name:ru            Автоматический Пропуск Рекламы На YouTube
// @name:id            Lewati Otomatis Iklan YouTube
// @name:hi            YouTube विज्ञापन स्वचालित रूप से छोड़ें
// @name:th            ข้ามโฆษณา YouTube อัตโนมัติ
// @namespace          https://github.com/tientq64/userscripts
// @version            4.1.2
// @description        Automatically skip YouTube ads almost instantly. Very lightweight and efficient.
// @description:vi     Tự động bỏ qua quảng cáo YouTube gần như ngay lập tức. Rất nhẹ và hiệu quả.
// @description:zh-CN  几乎立即自动跳过 YouTube 广告。非常轻量且高效。
// @description:zh-TW  幾乎立即自動跳過 YouTube 廣告。非常輕巧且高效。
// @description:ja     YouTube 広告をほぼ瞬時に自動的にスキップします。非常に軽量で効率的です。
// @description:ko     YouTube 광고를 거의 즉시 자동으로 건너뜁니다. 매우 가볍고 효율적입니다.
// @description:es     Omita automáticamente los anuncios de YouTube casi al instante. Muy ligero y eficiente.
// @description:ru     Автоматически пропускайте рекламу на YouTube практически мгновенно. Очень легкий и эффективный.
// @description:id     Lewati iklan YouTube secara otomatis hampir seketika. Sangat ringan dan efisien.
// @description:hi     YouTube विज्ञापनों को लगभग तुरंत ही स्वचालित रूप से छोड़ दें। बहुत हल्का और कुशल।
// @description:th     ข้ามโฆษณา YouTube โดยอัตโนมัติเกือบจะในทันที น้ำหนักเบามากและมีประสิทธิภาพ
// @author             tientq64
// @icon               https://cdn-icons-png.flaticon.com/64/2504/2504965.png
// @match              https://www.youtube.com
// @match              https://www.youtube.com/*
// @grant              none
// @license            MIT
// @compatible         firefox
// @compatible         chrome
// @compatible         opera
// @compatible         safari
// @compatible         edge
// @noframes
// ==/UserScript==

function skipAd(): void {
	setTimeout(skipAd, document.hidden ? 1000 : 500)

	const video: HTMLVideoElement = getVideo()
	if (!video) return

	const adPlayer = document.querySelector<HTMLDivElement>('#movie_player.ad-showing')
	if (adPlayer) {
		const skipButton = document.querySelector<HTMLElement>(`
			.ytp-skip-ad-button,
			.ytp-ad-skip-button,
			.ytp-ad-skip-button-modern
		`)
		if (skipButton) {
			skipButton.click()
		} else {
			video.currentTime = 9999
		}
	}

	const adBlockerWarningDialog = document.querySelector<HTMLElement>(
		'tp-yt-paper-dialog:has(#dismiss-button)'
	)
	if (adBlockerWarningDialog) {
		adBlockerWarningDialog.remove()
	}

	if (oldVideoSrc !== video.src) {
		oldVideoSrc = video.src
		fixVideoPausedAtFirst(video)
	}
}

function getVideo(): HTMLVideoElement {
	return document.querySelector('#movie_player video.html5-main-video')
}

function fixVideoPausedAtFirst(video: HTMLVideoElement): void {
	const videoSrc: string = video.src
	setTimeout(() => {
		if (video.src === videoSrc) {
			if (video.paused) {
				video.play()
			}
		}
	}, 2000)
}

let oldVideoSrc: string = ''
skipAd()

const style: HTMLStyleElement = document.createElement('style')
style.textContent = `
	#player-ads,
	#masthead-ad,
	#panels:has(ytd-ads-engagement-panel-content-renderer),
	ytd-ad-slot-renderer,
	ytd-rich-item-renderer:has(.ytd-ad-slot-renderer),
	ytd-reel-video-renderer:has(.ytd-ad-slot-renderer),
	tp-yt-paper-dialog:has(#dismiss-button) {
		display: none !important;
	}`
document.head.appendChild(style)
