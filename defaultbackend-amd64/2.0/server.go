package main

import (
	"context"
	"flag"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"
)

var port = flag.Int("port", 8080, "Port number to serve default backend 404 page.")

func main() {
	flag.Parse()

	index, _ := ioutil.ReadFile("index.html")
	png, _ := ioutil.ReadFile("404.png")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if strings.HasSuffix(r.URL.Path, "404.png") {
			w.WriteHeader(http.StatusOK)
			w.Header().Set("Content Type", "image/png")
			w.Write(png)
		} else {
			w.WriteHeader(http.StatusNotFound)
			fmt.Fprint(w, string(index))
		}
	})

	http.HandleFunc("/healthz", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		fmt.Fprint(w, "ok")
	})

	srv := &http.Server{
		Addr: fmt.Sprintf(":%d", *port),
	}

	go func() {
		err := srv.ListenAndServe()
		if err != http.ErrServerClosed {
			fmt.Fprintf(os.Stderr, "could not start http server: %s\n", err)
			os.Exit(1)
		}
	}()

	stop := make(chan os.Signal, 1)
	signal.Notify(stop, syscall.SIGTERM)
	<-stop

	ctx, cancel := context.WithTimeout(context.Background(), time.Minute)
	defer cancel()
	err := srv.Shutdown(ctx)
	if err != nil {
		fmt.Fprintf(os.Stderr, "could not graceful shutdown http server: %s\n", err)
	}
}
