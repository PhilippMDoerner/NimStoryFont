#!/binsh
sudo perf script | \
~/dev/FlameGraph/stackcollapse-perf.pl perf.script | \
~/dev/FlameGraph/flamegraph.pl > flamegraph.svg