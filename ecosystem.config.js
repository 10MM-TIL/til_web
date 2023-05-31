module.exports = {
  apps: [
    {
      /* 개발 환경용 서버 */
      name: 'til-dev',
      cwd: '/home/ubuntu/deploy',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1, // 단일 쓰레드
      autorestart: false,
      watch: false,
      env: {
        Server_PORT: 3000,
        NODE_ENV: 'development',
      },
    },
    {
      /* 배포 환경용 서버 */
      name: 'til-product',
      cwd: '/home/ubuntu/prod',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: -1, // 클러스터 모드
      exec_mode: 'cluster',
      autorestart: false,
      watch: false,
      wait_ready: true,
      listen_timeout: 50000,
      kill_timeout: 5000, // SIGINT ↔ SIGKILL 대기시간을 5초로 설정
      env: {
        Server_PORT: 1234,
        NODE_ENV: 'production',
      },
    },
  ],
};
