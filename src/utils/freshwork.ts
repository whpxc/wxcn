declare global {
	interface Window {
		fcWidgetMessengerConfig: any;
		fcWidget: any;
		fcSettings: any;
	}
}
/**
 * freshwork
 */
export class FreshChat {
	locale: Record<string, string>;
	freshchatSrc: string;
	constructor(freshchatSrc: string, locale: string) {
		this.freshchatSrc = freshchatSrc;
		this.locale = {
			"zh-CN": "zh-HANS",
			"zh-TW": "zh-HANT",
			"en-US": "en",
			"vi-VN": "vi",
			"ko-KR": "ko"
		};
		this.loadChat(locale);
	}
	private loadChat(key: string) {
		window.fcWidgetMessengerConfig = {
			locale: this.locale[key],
			open: false,
			config: {
				headerProperty: {
					hideChatButton: true
				}
			}
		};
		const s: any = document.createElement("script");
		s.id = "freshchat";
		s.type = "text/javascript";
		s.chat = true;
		s.src = this.freshchatSrc;
		document.body.appendChild(s);
	}
	openChat() {
		return new Promise(resolve => {
			try {
				window.fcWidget.open();
				resolve("success");
			} catch (e) {
				resolve("fail");
			}
		});
	}
}