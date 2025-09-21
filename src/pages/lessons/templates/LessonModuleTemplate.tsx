// Shim to preserve existing relative imports from lessons folder
// Many lesson files import "./templates/LessonModuleTemplate"
// After moving lessons under src/pages/lessons/, we re-export from the real template here.
export { default } from '../../templates/LessonModuleTemplate'
