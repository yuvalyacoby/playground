import { spawn } from 'child_process';
import { exit } from 'process';

const NUM = 4;

const runCkvAndKill = (i) => {
    console.log(i);
    const ckv = spawn('docker run --rm --tty --env BC_SOURCE=vscode --env BC_SOURCE_VERSION=1.0.89 -v "/Users/yyacoby/repos/platform:/checkovScan" -w /checkovScan "bridgecrew/checkov:2.2.258" -f "src/microStacks/notificationsStack/prismaGlobalAnalyticsStepFunctions.tf" -s --bc-api-key de48890b-8787-4acb-a718-14097030eb18 --repo-id "bridgecrew/platform" --skip-check "BC_LIC*" -o json',
    {
        shell: true,
        workingDir: '/Users/yyacoby/repos/platform'
    });
    
    // ckv.stdout.on('data', data => {
    //     console.log('[stdout-data] ', data.toString())
    // })
    ckv.stderr.on('data', data => {
        console.log('[stderr-data] ', data.toString())
    })
    ckv.on('error', data => {
        console.log('[error] ', data)
    })
    ckv.on('close', data => {
        console.log('[close] ', data)
    });
    
    setTimeout(() => { const killed = ckv.kill('SIGABRT'); console.log('killing... ', ckv.pid, ' kill result', killed);  if (i === NUM) exit(1)}, 5000+(i*1000));
}

for (let i = 1; i <= NUM; i++) {
    runCkvAndKill(i);
}