package com.ntsim.redis;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisClientConfiguration;
import org.springframework.data.redis.connection.jedis.JedisClientConfiguration.JedisClientConfigurationBuilder;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;

import redis.clients.jedis.JedisPoolConfig;

@Configuration
public class Redisconfig {

	@Bean(name = "jedisPoolConfig")
	public JedisPoolConfig jedisPoolConfig() {
		JedisPoolConfig config = new JedisPoolConfig();
		return config;
	}
	
	@Bean
	public JedisConnectionFactory jedisConnectionFactory(@Qualifier("jeidsPoolConfig") JedisPoolConfig jedisPoolConfig) {
		RedisStandaloneConfiguration standConfig = new RedisStandaloneConfiguration();
		standConfig.setHostName("localhost");
		standConfig.setPort(6379);
		JedisClientConfigurationBuilder jedisConfig = JedisClientConfiguration.builder();
		jedisConfig.connectTimeout(Duration.ofSeconds(1000000));
		jedisConfig.usePooling().poolConfig(jedisPoolConfig);
		return new JedisConnectionFactory(standConfig, jedisConfig.build());
	}

	@Bean
	public RedisTemplate redisTemplate() {
		RedisTemplate config = new RedisTemplate();
		config.setConnectionFactory(jedisConnectionFactory(jedisPoolConfig()));
		return config; 
	}
	
}
