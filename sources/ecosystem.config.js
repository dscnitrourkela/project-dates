/** @format */

module.exports = {
	apps: [
		{
			name: 'dev',
			script: 'index.js',
			watch: '.',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
			exec_mode: 'cluster',
			instances: 1,
			exp_backoff_restart_delay: 100,
		},
		{
			name: 'prod',
			script: 'index.js',
			watch: false,
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
			exec_mode: 'cluster',
			instances: 0,
			error_file: './logs/err.log',
			out_file: './logs/out.log',
			log_file: './logs/combined.log',
			time: true,
			exp_backoff_restart_delay: 100,
		},
	],
};
