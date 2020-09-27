import { Component, Vue, Watch } from 'vue-property-decorator'
import { AppModule, DeviceType } from '@/store/modules/app'

const WIDTH = 992 // refer to Bootstrap's responsive design
@Component({
  name: 'Mixin'
})
export default class extends Vue {
	get device() {
		return AppModule.device
	}
	beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }
	mounted(){
		if(this.isMobile()) {
			AppModule.ToggleDevice(DeviceType.Mobile);
			AppModule.CloseSideBar(true);
		}
	}
	boforeDestroyed() {
		window.removeEventListener('resize', this.resizeHandler)
	}
	private isMobile(){
		const rect = document.body.getBoundingClientRect();
		return rect.width - 1 < WIDTH;
	}
	private resizeHandler(){
		if(!document.hidden){
			const isMobile = this.isMobile();
			AppModule.ToggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop);
			if(isMobile) {
				AppModule.CloseSideBar(true)
			}
		}
	}
}