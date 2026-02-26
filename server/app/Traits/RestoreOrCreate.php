<?php

namespace App\Traits;

trait RestoreOrCreate {
    public function restoreOrCreate($model, $column, $value) {
        $instance = $model::withTrashed()->firstOrCreate([
            $column => $value,
        ]);

        if($instance->trashed()) {
            $instance->restore();
        }

        return $instance;
    }
}
