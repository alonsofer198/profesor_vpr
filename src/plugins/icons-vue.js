import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlay,faHome,faTimes,faUserTie,faTasks,faIdBadge,faMapMarkedAlt,faInfo,faIndustry,faCaretSquareUp, faTree, faMapMarked, faCalendarDay, faDatabase, faSearch, faChartArea, faFolder, faMapMarkerAlt, faInfoCircle, faListAlt, faChartBar, faSeedling, faCheckSquare, faChartPie, faLayerGroup, faQuestionCircle, faLaptop, faFileDownload } from '@fortawesome/free-solid-svg-icons'
library.add(faPlay)
library.add(faHome)
library.add(faUserTie)
library.add(faTasks)
library.add(faIdBadge)
library.add(faMapMarkedAlt)
library.add(faInfo)
library.add(faIndustry)
library.add(faCaretSquareUp)
library.add(faTree)
library.add(faMapMarked)
library.add(faCalendarDay)
library.add(faDatabase)
library.add(faSearch)
library.add(faSearch)
library.add(faChartArea)
library.add(faFolder)
library.add(faMapMarkerAlt)
library.add(faInfoCircle)
library.add(faListAlt)
library.add(faChartBar)
library.add(faTimes)
library.add(faSeedling)
library.add(faCheckSquare)
library.add(faChartPie)
library.add(faLayerGroup)
library.add(faQuestionCircle)
library.add(faLaptop)
library.add(faFileDownload)

Vue.component('font-awesome-icon', FontAwesomeIcon)