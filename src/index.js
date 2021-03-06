import eltTransfer from './bpoEltTransfer/src/bpoEltTransfer'

const components = [ eltTransfer ];

function install(Vue) {
	components.map(component => {
		Vue.component(component.name, component);
	})
}

if(typeof window !== undefined && window.Vue) {
	install(window.Vue);
}

export default {
	eltTransfer,
	install
}
