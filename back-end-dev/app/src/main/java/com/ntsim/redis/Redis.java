package com.ntsim.redis;

import java.io.Serializable;

import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.connection.RedisConnection;
import org.springframework.data.redis.connection.RedisStringCommands.SetOption;
import org.springframework.data.redis.core.RedisCallback;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.types.Expiration;
import org.springframework.stereotype.Service;

@Service
public class Redis {

	public static String get(final String key, RedisTemplate<Serializable, Serializable> redisTemplate) {
		return redisTemplate.execute(new RedisCallback<String>(){
			@Override
		public String doInRedis(RedisConnection connection) throws DataAccessException {
			byte[] value = connection.get(key.getBytes());
			if(value!=null) {
				return new String(value);
			}
			return null;
		}
		});
	}
	
	public static void set(final String key, final String value, RedisTemplate<Serializable, Serializable> redisTemplate) {
		
		redisTemplate.execute(new RedisCallback<String>() {
			@Override
		public String doInRedis(RedisConnection connection) throws DataAccessException {
			connection.set(key.getBytes(), value.getBytes());
			return null;
		}
		});
	}
	
	public static void set(final String key, final String value, final long time, RedisTemplate<Serializable, Serializable> redisTemplate) {
		redisTemplate.execute(new RedisCallback<String>() {
			@Override
		public String doInRedis(RedisConnection connection) throws DataAccessException {
			connection.set(key.getBytes(), value.getBytes(), Expiration.milliseconds(time), SetOption.UPSERT);	
			return null;
		}
		});
	}
	
}
