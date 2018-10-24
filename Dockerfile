FROM ruby:2.5.1

ENV LANG=C.UTF-8
ENV TZ=America/Sao_Paulo

RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | tee /etc/apt/sources.list.d/google-chrome.list

RUN apt-get update -qq \
  && apt-get install -y \
  libpq5 \
  libpq-dev \
  libcurl4-openssl-dev \
  nodejs \
  google-chrome-stable \
  chromedriver \
  python-pip \
  software-properties-common \
  postgresql-client-9.6 \
  && apt-get clean

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN pip install selenium

RUN mkdir -p /bundle
ENV BUNDLE_PATH=/bundle

RUN mkdir -p /app

COPY . /app
WORKDIR /app

RUN gem install foreman
