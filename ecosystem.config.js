module.exports = {
  apps: [
    {
      /* 개발 환경용 서버 */
      name: 'til-dev',
      script: 'npm',
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
      script: 'npm',
      instances: -1, // 클러스터 모드
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
