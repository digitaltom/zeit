export function set_timer_config (name, timer_config) {
  let config = JSON.parse(localStorage.getItem('config'))
  if ( config['timers'][name] === undefined ) { config['timers'][name] = {} }
  config['timers'][name] = Object.assign({}, config['timers'][name], timer_config);
  localStorage.setItem('config', JSON.stringify(config))
}

export function get_timer_names (date) {
  if (localStorage.getItem(date) === null) { localStorage.setItem(date, JSON.stringify({})) }
  return Object.keys(JSON.parse(localStorage.getItem(date)))
}
